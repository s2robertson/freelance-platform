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
        // console.log(`Filter allSkills against ${JSON.stringify(skills)}`);
        return allSkills.filter(skill => !skills.find(s => s._id === skill._id));
    }, [skills]);

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