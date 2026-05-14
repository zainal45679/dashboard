import { useEffect } from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { toast } from 'sonner'
import { storageUrl } from '@/utils/base-url'


type Props = {
  file?: any
  setFile: (file: any) => void
  error: any
}

const FileUploaderSingle = (props: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: acceptedFiles => {
      const selectedFile = acceptedFiles[0]
      props.setFile(selectedFile) // Update the file in the parent component
    },
    onDropRejected: () => {
      toast.error('You can only upload files of type .png, .jpeg, .jpg')
      toast.error("You can't upload files larger than 5MB")
    }
  })

  // Ensure component resets when `file` is cleared
  useEffect(() => {
    if (!props.file) {
      // Do nothing specific, the `file` prop drives the content
    }
  }, [props.file])

  return (
    <Box
      {...getRootProps({ className: 'dropzone' })}
      style={{ ...(props.error ? { border: `2px dashed red` } : {}), ...(props.file ? { height: 450 } : {}) }}
    >
      <input {...getInputProps()} />
      {props.file ? (
        typeof props.file === 'string' ? (
          <Image
            key={props.file}
            alt={props.file}
            className='single-file-image'
            width={100}
            height={100}
            src={storageUrl + props.file.replaceAll('\\', '/')}
          />
        ) : (
          <Image
            key={props.file?.name || ''}
            alt={props.file?.name || ''}
            className='single-file-image'
            width={100}
            height={100}
            src={URL.createObjectURL(props.file)}
          />
        )
      ) : (
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant='h5' sx={{ mb: 2.5 }}>
            Drop files here or click to upload.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default FileUploaderSingle