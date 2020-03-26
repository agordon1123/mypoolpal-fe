import React from 'react';

const InputGallonageForm = props => {

    const { shape, handleChange } = props
    
    return (
        <>
            {shape === 'rectangle' && (
                <div>
                    <label for='length'>Length:</label>
                    <input
                        type='text'
                        name='length'
                        onChange={handleChange}
                    />
                    <label for='width'>Width:</label>
                    <input
                        type='text'
                        name='width'
                        onChange={handleChange}
                    />
                    <label for='average-depth'>Average Depth:</label>
                    <input
                        type='text'
                        name='depth'
                        onChange={handleChange}
                    />
                    <button
                        type='submit'
                    >GO</button>
                </div>
            )}
        
            {shape === 'circular' && (
                <div>
                    <label for='width'>Width:</label>
                    <input
                        type='text'
                        name='width'
                        onChange={handleChange}
                    />
                    <label for='average-depth'>Depth:</label>
                    <input
                        type='text'
                        name='depth'
                        onChange={handleChange}
                    />
                    <button
                        type='submit'
                    >GO</button>
                </div>
            )}
        
            {shape === 'irregular' && (
                <div>
                    <label for='length'>Length:</label>
                    <input
                        type='text'
                        name='length'
                        onChange={handleChange}
                    />
                    <label for='short-width'>Short Width:</label>
                    <input
                        type='text'
                        name='shortWidth'
                        onChange={handleChange}
                    />
                    <label for='long-width'>Long Width:</label>
                    <input
                        type='text'
                        name='longWidth'
                        onChange={handleChange}
                    />
                    <label for='average-depth'>Depth:</label>
                    <input
                        type='text'
                        name='depth'
                        onChange={handleChange}
                    />
                    <button
                        type='submit'
                    >GO</button>
                </div>
            )}
        </>
    )
};

export default InputGallonageForm;