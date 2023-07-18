import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_ALL_SERVICES } from '../../utils/queries';

function SkillPicker({ skills, addSkill, removeSkill }) {
  const { data } = useQuery(QUERY_ALL_SERVICES);

  const skillsList = useMemo(() => {
    // console.log(`Filter allSkills against ${JSON.stringify(skills)}`);
    if (!data) {
      return [];
    }
    return data.services.filter(skill => !skills.find(s => s._id === skill._id));
  }, [skills, data]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  function onChangeSelected(e) {
    setSelectedIndex(e.target.value);
  }

  return (
    <div>
      <div className='ml-0.5'>
        <select className='py-2' value={selectedIndex} onChange={onChangeSelected}>
          {skillsList.map((skill, index) => <option value={index} key={skill._id}>{skill.name}</option>)}
        </select>
        <button
          type='button'
          onClick={() => {
            addSkill(skillsList[selectedIndex]);
            setSelectedIndex(0);
          }}
          className="border border-solid border-gray-300 bg-blue-500 py-2 px-3 my-3 text-white hover:bg-blue-600 rounded-md"
        >
          Add Skill
        </button>
      </div>
      <ul className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-3 -mt-3 focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5'>
        {skills.map(skill => (
          <li key={skill._id}>
            {skill.name}
            <button type='button' onClick={() => removeSkill(skill)}>
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkillPicker;