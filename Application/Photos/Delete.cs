using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Application.Errors;
using System.Net;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not found" });

                if (photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new { Photo = "you cannot delete your main photo" });

                var result = _photoAccessor.DeletePhoto(photo.Id);
                if (result == null)
                    throw new Exception("Problem deleting the photo");
                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("problem saving changes");
            }
        }
    }
}