import React, { useState } from "react";
import '../WordCard'

export default function WordCard () {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingWordId, setEditingWordId] = useState(null);
    const [editedWord, setEditedWord] = useState({});

    const fetchData = async () => {
    try {
        const response = await fetch('http://itgirlschool.justmakeit.ru/api/words');
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWords(data);
        setLoading(false);
    } catch (e) {
        setError(e);
        setLoading(false);
    }
    };
    fetchData();

    const handleEdit = (word) => {
    setEditingWordId(word.id);
    setEditedWord({ ...word });
    };

    const handleCancelEdit = () => {
    setEditingWordId(null);
    setEditedWord({});
    };

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedWord({ ...editedWord, [name]: value });
    };

    const handleSave = () => {
    const updatedWords = words.map((word) =>
        word.id === editedWord.id ? { ...editedWord } : word
    );
    setWords(updatedWords);
    setEditingWordId(null);
    setEditedWord({});
    };

    const handleDelete = (wordId) => {
    const updatedWords = words.filter((word) => word.id !== wordId);
    setWords(updatedWords);
    };

    if (loading) {
    return <div>Загрузка...</div>;
    }

    if (error) {
    return <div>Ошибка: {error.message}</div>;
    }

    return(
        <div className="container">
            <h1>Список слов</h1>
            <table>
            <thead>
                <tr>
                <th>English</th>
                <th>Russian</th>
                <th>Transcription</th>
                <th>Part of Speech</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {words.map((word) => (
                <tr key={word.id}>
                    {editingWordId === word.id ? (
                    <>
                        <td>
                        <input
                            type="text"
                            name="english"
                            value={editedWord.english || ''}
                            onChange={handleInputChange}
                        />
                        </td>
                        <td>
                        <input
                            type="text"
                            name="russian"
                            value={editedWord.russian || ''}
                            onChange={handleInputChange}
                        />
                        </td>
                        <td>
                        <input
                            type="text"
                            name="transcription"
                            value={editedWord.transcription || ''}
                            onChange={handleInputChange}
                        />
                        </td>
                        <td>
                        <input
                            type="text"
                            name="part_of_speech"
                            value={editedWord.part_of_speech || ''}
                            onChange={handleInputChange}
                        />
                        </td>
                        <td>
                        <button onClick={handleSave}>Сохранить</button>
                        <button onClick={handleCancelEdit}>Отмена</button>
                        </td>
                    </>
                    ) : (
                    <>
                        <td>{word.english}</td>
                        <td>{word.russian}</td>
                        <td>{word.transcription}</td>
                        <td>{word.part_of_speech}</td>
                        <td>
                        <button onClick={() => handleEdit(word)}>Редактировать</button>
                        <button onClick={() => handleDelete(word.id)}>Удалить</button>
                        </td>
                    </>
                    )}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}