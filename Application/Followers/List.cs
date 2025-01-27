using System;
using System.Threading.Tasks;
using System.Threading;

using MediatR;
using Domain;
using Persistence;
using Application.Errors;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<List<Profile>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Profile>>
        {
            private readonly IProfileReader _profileReader;

            private readonly DataContext _context;
            public Handler(DataContext context, IProfileReader profileReader)
            {
                _profileReader = profileReader;
                _context = context;

            }
            public async Task<List<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Followings.AsQueryable();

                var userFollowings = new List<UserFollowing>();
                var profiles = new List<Profile>();
                switch (request.Predicate)
                {
                    case "followers":
                        {
                            userFollowings = await queryable.Where(x => x.Target.UserName == request.Username).ToListAsync();
                            foreach (var follower in userFollowings)
                            {
                                profiles.Add(await _profileReader.ReadProfile(follower.Observer.UserName));
                            }
                            break;
                        }
                    case "following":
                        {
                            userFollowings = await queryable.Where(x => x.Observer.UserName == request.Username).ToListAsync();
                            foreach (var follower in userFollowings)
                            {
                                profiles.Add(await _profileReader.ReadProfile(follower.Target.UserName));
                            }
                            break;
                        }


                }

                return profiles;
            }
        }
    }
}