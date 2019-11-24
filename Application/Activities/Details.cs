using System;
using System.Threading.Tasks;
using System.Threading;

using MediatR;
using Domain;
using Persistence;
using Application.Errors;
using System.Net;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly DataContext _context;
            public IMapper _mapper { get; }
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {

                //throw new Exception("Computer says no");

                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found" });
                var activitiyToReturn = _mapper.Map<Activity, ActivityDto>(activity);
                // _context.Remove(activity);
                return activitiyToReturn;
            }
        }

    }
}