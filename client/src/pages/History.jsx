import { useEffect, useState } from 'react';
import api from '../utils/api';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await api.get('/ai/history');
            setHistory(res.data);
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleDetails = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-semibold">History</h1>
                <p className="text-gray-500 mt-4">Loading history...</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-2">History</h1>

            <p className="text-gray-500 mb-6">
                {history.length} generated emails found
            </p>

            {history.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        No emails generated yet
                    </h3>

                    <p className="mt-2 text-gray-500">
                        Create your first campaign to start building outreach messages.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white border rounded-lg p-5 shadow-sm"
                        >
                            <div className="mb-3">
                                <p className="font-semibold">Prompt:</p>
                                <p className="text-gray-700">
                                    {item.prompt}
                                </p>
                            </div>

                            <div className="mb-3">
                                <p className="font-semibold">Subject:</p>
                                <p>{item.subject}</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">
                                    {new Date(item.createdAt).toLocaleString()}
                                </p>

                                <button
                                    onClick={() => toggleDetails(item._id)}
                                    className="text-primary-600 font-medium hover:underline"
                                >
                                    {expandedId === item._id
                                        ? 'Hide Details'
                                        : 'View Details'}
                                </button>
                            </div>

                            {expandedId === item._id && (
                                <div className="mt-6 border-t pt-4 space-y-5">

                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Cold Email
                                        </h3>
                                        <div className="bg-gray-50 p-3 rounded">
                                            {item.emailBody}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            LinkedIn DM
                                        </h3>
                                        <div className="bg-gray-50 p-3 rounded">
                                            {item.linkedInDM}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Follow-up Email
                                        </h3>
                                        <div className="bg-gray-50 p-3 rounded">
                                            {item.followUpEmail}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;