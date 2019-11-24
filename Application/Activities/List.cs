
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.EntityFrameworkCore;

using MediatR;
using Domain;
using Persistence;
using AutoMapper;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            public IMapper _mapper { get; }

            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities.ToListAsync();

                return _mapper.Map<List<Activity>, List<ActivityDto>>(activities);
            }
        }
    }
}