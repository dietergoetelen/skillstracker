using SkillsTracker.DAL;
using SkillsTracker.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SkillsTracker.API.Controllers
{
    [RoutePrefix("api/skills")]
    public class SkillsController : ApiController
    {
        private IBaseRepository<Skill> _skillRepo;

        public SkillsController(IBaseRepository<Skill> skillRepo)
        {
            _skillRepo = skillRepo;
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var allSkills = await _skillRepo.Get();

                if (allSkills != null)
                {
                    return Ok(allSkills);
                }

                return NotFound();
            }catch(Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("{id}", Name="GetSingleSkill")]
        public async Task<IHttpActionResult> Get(int id)
        {
            try
            {
                var skill = await _skillRepo.FirstOrDefaultAsync(s => s.Id == id);

                if (skill == null)
                    return NotFound();

                return Ok(skill);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("", Name="PostSkill")]
        public async Task<IHttpActionResult> Post(Skill skill)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var newSkill = _skillRepo.Add(skill);


                if (newSkill != null)
                {
                    await _skillRepo.SaveChangesAsync();
                    return Created<Skill>(Url.Route("GetSingleSkill", new { id = newSkill.Id }), newSkill);
                }

                return BadRequest();
            }
            catch(Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPut]
        [Route("{id}", Name="PutSkill")]
        public async Task<IHttpActionResult> Put(int id, Skill skill)
        {
            try
            {
                if(!ModelState.IsValid || id <= 0)
                {
                    return BadRequest(ModelState);
                }

                bool skillExists = (await _skillRepo.FirstOrDefaultAsync(s => s.Id == id)) != null;

                if (!skillExists)
                    return NotFound();

                if (skill.Id != id)
                    skill.Id = id;

                _skillRepo.Update(skill);

                await _skillRepo.SaveChangesAsync();

                return Ok(skill);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("{id}", Name = "DeleteSkill")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            try
            {
                // see if exists
                var skill = await _skillRepo.FirstOrDefaultAsync(s => s.Id == id);

                if(skill == null)
                    return NotFound();

                _skillRepo.Remove(skill);

                await _skillRepo.SaveChangesAsync();

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
    }
}
