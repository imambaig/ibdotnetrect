using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    /*  public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
      {
          private readonly IHttpContextAccessor _httpContextAccessor;
          private readonly DataContext _context;
          public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
          {
              _context = context;
              _httpContextAccessor = httpContextAccessor;

          }
          /*  protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
            {

                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                //RouteTable.Routes.GetRouteData(new HttpContextWrapper(HttpContext.Current));

                //var activityId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());
                var activityId = Guid.Parse("4b6e8b7f-0703-4358-b9f1-be64e31db06b");
                var activity = _context.Activities.FindAsync(activityId).Result;

                var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);
                if (host?.AppUser?.UserName == currentUserName)
                    context.Succeed(requirement);

                return Task.CompletedTask;
            }
      }*/
}