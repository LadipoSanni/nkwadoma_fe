// const React = require('react');
// module.exports = {
//     __esModule: true,
//     default: React.forwardRef((props, ref) => <div ref={ref} {...props} />),
// };
// const React = require('react');
// const getEditor = () => ({
//     root: {
//         innerHTML: ''
//     },
//     on: () => {},
//     off: () => {},
// });

// const ReactQuill = React.forwardRef((props, ref) => {
//     // Forward ref is necessary to simulate the ref forwarding behavior of ReactQuill
//     React.useImperativeHandle(ref, () => ({
//         getEditor,
//     }));
//     return <div ref={ref} {...props}>ReactQuill Mock</div>;
// });

// module.exports = {
//     __esModule: true,
//     default: ReactQuill,
// };
const React = require('react');

// Mock implementation of the Quill editor
const mockEditor = {
    root: {
        innerHTML: '',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    },
    on: jest.fn(),
    off: jest.fn(),
};

// Mock implementation of ReactQuill
const ReactQuill = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
        getEditor: () => mockEditor,
    }));
    return <div ref={ref} {...props}>ReactQuill Mock</div>;
});

module.exports = {
    __esModule: true,
    default: ReactQuill,
};
