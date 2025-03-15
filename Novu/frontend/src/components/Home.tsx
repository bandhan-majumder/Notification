import React, { useState } from 'react';
import axios from 'axios';
import { Novu } from './Inbox';

const Home = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/trigger-event", {
                email,
                phone: phoneNumber
            })
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            height: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            fontFamily: 'Arial, sans-serif',
        }}>
            <div style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                padding: '30px',
                width: '350px',
            }}>
                <h1 style={{
                    color: '#333',
                    textAlign: 'center',
                    marginBottom: '24px',
                    fontSize: '28px',
                    fontWeight: '600',
                }}>Contact Information</h1>
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    }}>
                        <label style={{
                            fontWeight: '500',
                            color: '#555',
                            fontSize: '16px',
                        }}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                padding: '12px 16px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.3s',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    }}>
                        <label style={{
                            fontWeight: '500',
                            color: '#555',
                            fontSize: '16px',
                        }}>Phone Number (with country code):</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            style={{
                                padding: '12px 16px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.3s',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <button type="submit" style={{
                        backgroundColor: '#4a90e2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '14px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        marginTop: '10px',
                    }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a7bd5'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a90e2'}
                    >Submit</button>
                </form>
            </div>
            <div style={{ marginTop: '200px' }}>
                <Novu />
            </div>
        </div>
    );
};

export default Home;