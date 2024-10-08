import React from 'react'
import NavBar from '../components/NavBar'
import bg from '../assets/bg.svg'
import { Loader2Icon, XCircle } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../config/api'
import Swal from 'sweetalert2'
import { Button, Divider } from '@chakra-ui/react'
import step1 from '../assets/step1.jpg'
import step2 from '../assets/step2.jpg'
import logo from '../logo.svg'
import step3 from '../assets/step3.jpg'
import Footer from './Admin/comps/Footer'

export default function Home() {
  const [url,setUrl]=React.useState('')
  const [loading,setLoading]=React.useState(false)
  const [download,setDownload]=React.useState('')
  const downloadVideo=async()=>{
    setLoading(true)
   try {
    await axios.post(API_URL+'video',{
      url:url
    })
    .then(res=>{
      setDownload(res.data.videoSrc)
      setLoading(false)
    }
    )
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })

    
   } catch (error) {
      console.log(error)
      setLoading(false)
   }
   finally{
      setLoading(false)
   }
  }
  const downloadImage=async()=>{
    setLoading(true)
   try {
    await axios.post(API_URL,{
      url:url
    })
    .then(res=>{
      setDownload(res.data.imageUrl)
      setLoading(false)
    }
    )
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })

    
   } catch (error) {
      console.log(error)
      setLoading(false)
   }
   finally{
      setLoading(false)
   }
  }
  const downloadGif=()=>{
    setLoading(true)
    fetch(`http://localhost:3002/downloadGif?url=${url}`)
    .then(res=>res.json())
    .then(data=>{
      setDownload(data.url)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })
  }
  const downloadAll=()=>{
    setLoading(true)
    fetch(`http://localhost:3002/downloadAll?url=${url}`)
    .then(res=>res.json())
    .then(data=>{
      setDownload(data.url)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })
  }

  const handleDownload = async (fileUrl:string,fileName:string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed', error);
    }
  };
  return (
   <>{
    download.includes('.mp4') ? 
    <div className='w-full h-screen bg-[rgba(0,0,0,0.5)]  top-0 z-100 fixed flex justify-center items-center' style={{display:download?'flex':'none'}}>
      
    <div className='bg-white p-5 rounded-lg '>
    <div className='w-full '>
    <XCircle onClick={()=>{
      setDownload('')
    }} className='cursor-pointer hover:scale-95 '/>
      </div>
      <video src={download} controls className='w-[500px] rounded-md h-[500px]'/>
      <div className='w-full p-2'>
    <Button onClick={()=>{
      handleDownload(download,'downloaded_image.mp4')

      }} colorScheme='red'>Download</Button>
    </div>
      </div>
    </div>
    :
    download.includes('.jpg') ?
    <div className='w-full h-screen bg-[rgba(0,0,0,0.5)] top-0 z-50 fixed flex justify-center items-center' style={{display:download?'flex':'none'}}>
    
    <div className='bg-white p-5 rounded-lg '>
    <div className='w-full '>
    <XCircle onClick={()=>{
      setDownload('')
    }} className='cursor-pointer hover:scale-95 '/>
      </div>
      <img src={download} alt="download" className='w-[500px] rounded-md h-[500px]'/>
    <div className='w-full p-2'>
    <Button onClick={()=>{
      handleDownload(download,'downloaded_image.jpg')
      }} colorScheme='red'>Download</Button>
    </div>

      </div>

    </div>
    :
    <>
    </>

   }
   <div className='w-full h-screen bg-[rgba(0,0,0,0.5)] top-0 z-50 fixed flex justify-center items-center' style={{display:loading?'flex':'none'}}>
    <div className='bg-white p-5 rounded-lg'>
      <Loader2Icon size={40} className=' animate-spin'/>
    
    </div>
    </div>
    <div className='min-h-screen w-full ' >
        <NavBar/>
        <div className="bg-gradient-to-b from-[#c8242c] via-[#c8242c] min-h-[60vh] to-[#c8242c] px-6 sm:py-20 py-10 font-[sans-serif]">
      <div className="max-w-screen-xl mx-auto text-center text-white">
        <h1 className="text-5xl max-sm:text-3xl font-extrabold leading-tight mb-2" style={{
      fontFamily:'Poppins',
      fontWeight:600
    }}>Pinterest Downloader</h1>
        <p className="text-lg mb-12" style={{
      fontFamily:'Poppins',
    }}>Download Pinterest video, Image and Gif online.</p>
        <input type="url" onChange={(e)=>{
          setUrl(e.target.value)

        }} placeholder="Enter pintrest post link" value={url}  className="bg-white text-black w-96 max-sm:w-full px-4 py-3 rounded-full mb-6 mr-2" />
        <button type="button" onClick={()=>{
        Swal.fire({
          title: 'Select download type',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Image`,
          denyButtonText: `Video`,
        }).then((result) => {
          if (result.isConfirmed) {
           downloadImage()
          } else if (result.isDenied) {
            downloadVideo()
          } else if (result.isDismissed) {
            return
          }
        })
        
        }} className="bg-[rgba(255,255,255,0.5)] text-white text-lg tracking-wide px-8 py-2.5 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl">Download</button>
      </div>




    </div>
    <div className='w-full my-10 p-5 py-5 px-2'>

    <div className="font-[sans-serif]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="text-gray-800 text-4xl font-bold mb-4">How to use Pinterest Downloader?</h2>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-12 max-sm:max-w-sm max-sm:mx-auto">
         
        <div className="border rounded-md p-6 min-h-[60vh] flex flex-col">
            <div className='w-full h-[80%] '
            style={{
              backgroundImage:`url(${step1})`,
              backgroundSize:'contain',
              objectFit:'contain',
              backgroundRepeat:'no-repeat',
              backgroundPosition:'center'
            }}
            ></div>
            <div className='w-full h-[20%]'>
            <h2 className="text-gray-800 text-2xl font-bold mb-4">#1. Copy Video URL</h2>
            <p className="text-gray-600 text-sm">Copy the Pinterest video URL which you want to save.</p>
            </div>
           
          </div>

          <div className="border rounded-md p-6 min-h-[60vh] flex flex-col">
            <div className='w-full h-[80%] '
            style={{
              backgroundImage:`url(${step2})`,
              backgroundSize:'contain',
              objectFit:'contain',
              backgroundRepeat:'no-repeat',
              backgroundPosition:'center'
            }}
            ></div>
            <div className='w-full h-[20%]'>
            <h2 className="text-gray-800 text-2xl font-bold mb-4">#2. Paste The Links</h2>
            <p className="text-gray-600 text-sm">Paste the URL of the Pinterest video that you copied to download, then click the download button.</p>
            </div>
           
          </div>

          <div className="border rounded-md p-6 min-h-[60vh] flex flex-col">
            <div className='w-full h-[80%] '
            style={{
              backgroundImage:`url(${step3})`,
              backgroundSize:'contain',
              objectFit:'contain',
              backgroundRepeat:'no-repeat',
              backgroundPosition:'center'
            }}
            ></div>
            <div className='w-full h-[20%]'>
            <h2 className="text-gray-800 text-2xl font-bold mb-4">#3. Download Video</h2>
            <p className="text-gray-600">Now just click the download button and your download will be started.</p>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
  <h1 className='text-center text-3xl  font-bold'>Pinterest Downloader</h1>
      <p className='xl:px-40 md:px-40 lg:px-40 px-10 text-center'>Pinterest Downloader is a free Pinterest video downloader online tool. You can also download Pinterest Images and Gif directly to your computer, tablet or mobile by using Pinterest Downloader. You can save and download Pinterest Videos in High definition MP4 format and also download Pinterest Images in HD JPG format with PinterestDownloader.com. why we developed Pinterest Downloader? because we noticed that Pinterest does not allow to download videos. Due to which people were facing a lot of trouble in downloading Pinterest videos. Pinterest Downloader is a solution for those who want to download Pinterest videos for the free and easy way.</p>
    </div>
    <div className='w-full  h-[100vh] my-10'>
      <h1 className='text-center text-3xl font-bold'>How to download Pinterest Videos, Images or Gif</h1>
      <p className='xl:px-40 md:px-40 lg:px-40 px-10 text-left mt-5'>Pinterest Downloader is easy-to-use for you. You can easily download videos from Pinterest without any limitations. Also, you do not need any registration or to pay a fee for the download. This tool is completely free. Follow the simple steps below to download Pinterest videos online.</p>
      <ul className='xl:px-40 md:px-40 lg:px-40 px-10 text-left list-disc mt-5'>
        <li>Open Pinterest App and select the video or image or gif which you want to download.</li>
        <li>Tap on ••• icon at the top right corner of the Pinterest app if you are using the latest version of the Pinterest app then Tap on ••• icon at the bottom right corner of the app. After taping ••• icon then tap on the copy link.</li>
        <li>Paste the video Url in the Download Input Box, and Tap on Download button.</li>
        <li>You can see the preview of your download file and there Download button just below it.</li>
        <li>Tap on the Download button to download. Pinterest video or image or gif will be download to your device.</li>
        </ul>
        <h1 className='text-center text-3xl mt-10 font-bold'>Video Guide</h1>
      <p className='xl:px-40 md:px-40 lg:px-40 px-10 text-left mt-5'>Pinterest Downloader is easy-to-use for you. You can easily download videos from Pinterest without any limitations. Also, you do not need any registration or to pay a fee for the download. This tool is completely free. Follow the simple steps below to download Pinterest videos online.</p>
     <div className='w-full py-10 flex justify-center items-center'>
     <iframe width="560" height="315" src="https://www.youtube.com/embed/UEEwiL8kuXA?si=gOj9ty4LzrsVYhSf" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
     </div>
   
     <div className="font-[sans-serif] divide-y my-5 rounded-lg max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Frequently asked questions</h2>
      </div>
      <div role="accordion">
        <button type="button"
          className="w-full text-base text-left font-semibold py-6 text-gray-800 flex items-center">
          <span className="mr-4">Are there any special discounts or promotions available during the event.</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 fill-current ml-auto shrink-0" viewBox="0 0 124 124">
            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000" />
          </svg>
        </button>
        <div className="py-4">
          <p className="text-sm text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu,
            at fermentum dui. Maecenas
            vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae
            consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam
            auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et
            tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in.
          </p>
        </div>
      </div>
      <div role="accordion">
        <button type="button"
          className="w-full text-base text-left font-semibold py-6 text-gray-800 flex items-center">
          <span className="mr-4">What are the dates and locations for the product launch events?</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 fill-current ml-auto shrink-0" viewBox="0 0 42 42">
            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
          </svg>
        </button>
        <div className="hidden py-4">
          <p className="text-sm text-gray-800">Content</p>
        </div>
      </div>
      <div role="accordion">
        <button type="button"
          className="w-full text-base text-left font-semibold py-6 text-gray-800 flex items-center">
          <span className="mr-4">Can I bring a guest with me to the product launch event?</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 fill-current ml-auto shrink-0" viewBox="0 0 42 42">
            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
          </svg>
        </button>
        <div className="hidden py-4">
          <p className="text-sm text-gray-800">Content</p>
        </div>
      </div>
      <div role="accordion">
        <button type="button"
          className="w-full text-base text-left font-semibold py-6 text-gray-800 flex items-center">
          <span className="mr-4">How can I register for the event?</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 fill-current ml-auto shrink-0" viewBox="0 0 42 42">
            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
          </svg>
        </button>
        <div className="hidden py-4">
          <p className="text-sm text-gray-800">Content</p>
        </div>
      </div>
      <div role="accordion">
        <button type="button"
          className="w-full text-base text-left font-semibold py-6 text-gray-800 flex items-center">
          <span className="mr-4">Is there parking available at the venue?</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 fill-current ml-auto shrink-0" viewBox="0 0 42 42">
            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
          </svg>
        </button>
        <div className="hidden py-4">
          <p className="text-sm text-gray-800">Content</p>
        </div>
      </div>
      <div role="accordion">
        <button type="button"
          className="w-full text-base text-left font-semibold py-6 text-gray-800 flex items-center">
          <span className="mr-4">How can I contact the event organizers?</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 fill-current ml-auto shrink-0" viewBox="0 0 42 42">
            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000" />
          </svg>
        </button>
        <div className="hidden py-4">
          <p className="text-sm text-gray-800">Content</p>
        </div>
      </div>
    </div>
  <Footer/>
 
    </div>
       
       
   </>
  )
}
