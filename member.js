function skillsMember() {
  const member = document.querySelector('.member');
  const memberSkills = document.querySelector('.member__skills');
  const memberSkillsList = document.querySelector('.member__skills-list');
  const memberSkillsListItems = document.querySelectorAll('.member__skills-list-item');
  const memberSkillsListItemsLength = memberSkillsListItems.length;

  if (member) {
    member.addEventListener('click', function (e) {
      if (e.target.classList.contains('member__skills')) {
        memberSkills.classList.toggle('member__skills--active');
      }
    });
  }

  if (memberSkillsListItemsLength > 5) {
    memberSkillsList.classList.add('member__skills-list--active');
  }
}