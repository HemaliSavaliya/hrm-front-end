/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 70,
    height: 70,
    padding: 4,
    boxSizing: 'border-box',
    justifyContent: "center",
    alignItems: "center"
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    filter: "opacity(0.5)"
};

export const DropFiles = ({ handleImageChange }) => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.pdf', '.docx', '.doc', '.ppt', '.pptx', '.xls', '.xlsx'],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
            handleImageChange(acceptedFiles); // Pass selected files to parent component
        }
    });

    const getFileIcon = (fileName) => {
        const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        switch (fileExtension) {
            case 'pdf':
                return <Image width={50} height={50} src="/images/document/pdf.png" alt={fileName} style={img} />;
            case 'doc':
            case 'docx':
                return <Image width={50} height={50} src="/images/document/word.png" alt={fileName} style={img} />;
            case 'ppt':
            case 'pptx':
                return <Image width={50} height={50} src="/images/document/powerpoint.png" alt={fileName} style={img} />;
            case 'xls':
            case 'xlsx':
                return <Image width={50} height={50} src="/images/document/excel.png" alt={fileName} style={img} />;
            default:
                return <Image width={50} height={50} src="/images/document/image.png" alt={fileName} style={img} />;
        }
    };

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                {getFileIcon(file.name)}
                {/* {file.type.startsWith('image/') ? (
                    <img src={file.preview} style={img} alt={file.name} />
                ) : null} */}
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className="text-center">Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
    );
};