
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.EntityFrameworkCore;

using MediatR;
using Domain;
using Persistence;
using AutoMapper;
using System.Linq;
using System;
using Application.Interfaces;
namespace Application.Activities
{
    public class List
    {
        public class ActivitiesEnvelop
        {
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }
        }
        public class Query : IRequest<ActivitiesEnvelop>
        {
            public Query(int? limit, int? offset, bool isGoing, bool isHost,
            DateTime? startDate)
            {
                Limit = limit;
                Offset = offset;
                IsHost = isHost;
                IsGoing = isGoing;
                StartDate = startDate ?? DateTime.Now;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }

            public bool IsHost { get; set; }

            public bool IsGoing { get; set; }
            public DateTime? StartDate { get; set; }

        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelop>
        {
            public IMapper _mapper { get; }

            private readonly DataContext _context;

            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;

            }
            public async Task<ActivitiesEnvelop> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Activities
                            .Where(x => x.Date >= request.StartDate)
                            .OrderBy(x => x.Date)
                            .AsQueryable();

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable.Where(x => x.UserActivities.Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                }

                if (request.IsHost && !request.IsGoing)
                {
                    queryable = queryable.Where(x => x.UserActivities.Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsHost));
                }

                var activities = await queryable
                                .Skip(request.Offset ?? 0)
                                .Take(request.Limit ?? 3).ToListAsync();
                var rtn = new ActivitiesEnvelop
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>>(activities),
                    ActivityCount = queryable.Count()
                };
                return rtn;
            }
        }
    }
}