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
            <select value={selectedIndex} onChange={onChangeSelected}>
                {skillsList.map((skill, index) => <option value={index} key={skill._id}>{skill.name}</option>)}
            </select>
            <button 
                type='button'
                onClick={() => {
                    addSkill(skillsList[selectedIndex]);
                    setSelectedIndex(0);
                }}
            >
                Add Skill
            </button>
            <ul>
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