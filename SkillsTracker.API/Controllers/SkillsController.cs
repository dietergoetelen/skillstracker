﻿using SkillsTracker.DAL;
using SkillsTracker.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Data.Entity;

namespace SkillsTracker.API.Controllers
{
    [RoutePrefix("api/skills")]
    [Authorize]
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
                var allSkills = await _skillRepo.Get().ToListAsync();

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

                var dbSkill = await _skillRepo.FirstOrDefaultAsync(s => s.Id == id);

                if (dbSkill == null)
                    return NotFound();

                dbSkill.Name = skill.Name;

                _skillRepo.Update(dbSkill);

                await _skillRepo.SaveChangesAsync();

                return Ok(dbSkill);
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
