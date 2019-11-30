using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Net;
using Application.Errors;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            public string Username { get; set; }

        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly IMapper _mapper;

            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Not Found" });

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);
                // we are not using httpcontext to get the user as its signalr call
                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.Comments.Add(comment);
                //handler login
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return _mapper.Map<CommentDto>(comment);
                throw new Exception("problem saving changes");
            }
        }
    }
}