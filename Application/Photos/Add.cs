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

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Photo>
        {

            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
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

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);

                var user = await _context.Users.SingleAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };
                if (!user.Photos.Any(x => x.IsMain))
                    photo.IsMain = true;

                user.Photos.Add(photo);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return photo;
                throw new Exception("problem saving changes");
            }
        }
    }
}