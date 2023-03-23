import Head from 'next/head'
import Link from 'next/link'
import { ImagePickerConf } from 'react-image-picker-editor'
import { useState } from 'react'
import styles from './index.module.scss'
import 'react-image-picker-editor/dist/index.css'


import dynamic from 'next/dynamic'
const ReactImagePickerEditor = dynamic(() => import('react-image-picker-editor'), {
    ssr: false,
})

const ImagesEditor = () => {

    const config1: ImagePickerConf = {
        borderRadius: '8px',
        language: 'en',
        width: '280px',
        height: '200px',
        objectFit: 'contain',
        // aspectRatio: 4 / 3,
        compressInitial: 92
    };
    const [imagesArray, setImagesArray] = useState<Array<string | null | undefined>>([null, null, null]);



    return (
        <>
            <Head>
                <title>Image Editor</title>
                <meta name="description" content="Image editor using react-image-picker-editor npm package" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h2>Select and edit images</h2>
                <div className={styles.center}>
                    {imagesArray.map((_, index) => (
                        <ReactImagePickerEditor
                            key={index}
                            config={config1} />
                    )
                    )}

                </div>
                <Link href="/" className={styles.description}>
                    <p>
                        Go back
                    </p>
                </Link>
            </main>
        </>

    )

}

export default ImagesEditor;