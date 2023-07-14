function ProfileDisplay({ user, startEdit = null }) {
    return (
        <div className="mb-2">
            <h2 className="text-2xl font-bold">{user.username}</h2>
            {startEdit ? (
                <button
                    onClick={startEdit}
                    className="border-solid border-2 p-2"
                >
                    Edit
                </button>
            ) : null}
            <p>{user.profileDescription}</p>
            {user.skills && user.skills.length > 0 ? (
                <>
                    <h3>Skills:</h3>
                    <ul className="list-disc">
                        {user.skills.map(skill => (
                            <li key={skill._id}>{skill.name}</li>
                        ))}
                    </ul>
                </>
            ) : null}
        </div>
    )
}

export default ProfileDisplay;