namespace Application.Activities
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Persistence;
    using Domain;
    using FluentValidation;
    using Application.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using Application.Errors;
    public class Unattend
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {

            public readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler loginco
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, new { Activity = "can not find activity" });

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var attendance = await _context.UserActivities.SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id);
                if (attendance == null)
                    return Unit.Value;

                if (attendance.IsHost)
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, new { Attendance = "you cannot remove yourself as host" });

                _context.UserActivities.Remove(attendance);
                //handler login
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("problem saving changes");
            }
        }
    }
}