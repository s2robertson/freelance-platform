import { useState, useMemo } from 'react';

// replace this with useQuery
const allSkills = [
    { _id: 1, name: 'JavaScript' },
    { _id: 2, name: 'React' },
    { _id: 3, name: 'Node.js' },
    { _id: 4, name: 'SQL' },
    { _id: 5, name: 'MongoDB' },
    { _id: 6, name: 'GraphQL' }
];

function SkillPicker({ skills, addSkill, removeSkill }) {
    const skillsList = useMemo(() => {
        return allSkills.filter(skill => !skills.find(s => s._id === skill._id));
    }, [skills]);

    const [selectedSkill, setSelectedSkill] = useState(skillsList[0]);
    function onChangeSelected(e) {
        setSelectedSkill(e.target.value);
    }

    return (
        <div>
            <select value={selectedSkill} onChange={onChangeSelected}>
                {skillsList.map(skill => <option value={skill} key={skill._id}>{skill.name}</option>)}
            </select>
            <button onClick={() => addSkill(selectedSkill)}>
                Add Skill
            </button>
            <ul>
                {skills.map(skill => (
                    <li key={skill._id}>
                        {skill.name}
                        <button onClick={removeSkill(selectedSkill)}>
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SkillPicker;