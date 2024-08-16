import React from 'react'
import NavBar from '../components/NavBar'
import bg from '../assets/bg.svg'
import { Loader2Icon } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../config/api'
export default function Home() {
  const [url,setUrl]=React.useState('')
  const [loading,setLoading]=React.useState(false)
  const [download,setDownload]=React.useState('')
  const downloadVideo=()=>{
    setLoading(true)
    fetch(`http://localhost:3002/download?url=${url}`)
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
  const downloadImage=async()=>{
    setLoading(true)
   try {
    await axios.post(API_URL+'download',{
      url:url
    })
    .then(res=>{
      setDownload(res.data.url)
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

  return (
   <>
   <div className='w-full h-screen bg-[rgba(0,0,0,0.5)] top-0 z-50 fixed flex justify-center items-center' style={{display:loading?'flex':'none'}}>
    <div className='bg-white p-5 rounded-lg'>
      <Loader2Icon size={40} className=' animate-spin'/>
    
    </div>
    </div>
    <div className='min-h-screen w-full ' >
        <NavBar/>
        <img src={bg} alt="bg" className="absolute -z-10  h-[80vh] w-full object-cover"/>

        <div className=" flex flex-col w-full pt-[10%] items-center h-[80vh]">
          <h1 className='text-[80px] font-bold text-white'>Pinterest Downloader</h1>
          <p className='text-2xl text-white'>Download Pinterest video, Image and Gif online</p>
            <div className="flex mt-10">
                <input type="text" onChange={(e)=>{
                  setUrl(e.target.value)
                }} className='w-96 h-14 rounded-l-lg px-4' value={url} placeholder='Enter Pinterest URL'/>
                <button className='bg-blue-500 w-24 h-14 rounded-r-lg text-white' onClick={downloadImage} >Download</button>
                </div>
                <div className="flex mt-5">
                 {download==='' ? <></> :  <div className='bg-white w-[200px] h-[200px] rounded-lg flex justify-center items-center'>
                    <img src={download} alt="download" className='w-[150px] h-[150px]'/>
                    </div>}
               
                </div>
            </div>
            <div className='flex justify-center items-center flex-col mt-10 h-auto'>
                <h1 className='text-4xl  font-bold rounded-lg text-[#e60a23]'>How to use Pinterest Downloader?</h1>
                <section className="text-gray-400 bg-white body-font">
  <div className="container px-5 py-24 mx-auto">
   
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-auto  overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src="https://pinterestdownloader.com/static/img/pinterest-downloader-online.jpg" />
        </div>
        <h2 className="text-xl font-medium title-font text-black mt-5">#1. Copy Video URL</h2>
        <p className="text-base leading-relaxed mt-2">Copy the Pinterest video URL which you want to save.</p>

      </div>
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-auto  overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src="https://pinterestdownloader.com/static/img/pinterest-video-downloader-online.jpg" />
        </div>
        <h2 className="text-xl font-medium title-font text-black mt-5">#2. Paste The Links</h2>
        <p className="text-base leading-relaxed mt-2">Paste the URL of the Pinterest video that you copied to download, then click the download button.</p>
      
      </div>
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-auto overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src="https://pinterestdownloader.com/static/img/pinterest-videos-download.jpg" />
        </div>
        <h2 className="text-xl font-medium title-font text-black mt-5">#3. Download Video</h2>
        <p className="text-base leading-relaxed mt-2">Now just click the download button and your download will be started.</p>

      </div>
    </div>
  </div>
</section>
<div className='py-10 gap-5 flex flex-col'>

<h1 className='text-4xl font-bold text-[#e60a23] mb-2 text-center'>Pinterest Downloader</h1>
<p className='text-center px-52 text-sm'>
Pinterest Downloader is a free Pinterest video downloader online tool. You can also download Pinterest Images and Gif directly to your computer, tablet or mobile by using Pinterest Downloader. You can save and download Pinterest Videos in High definition MP4 format and also download Pinterest Images in HD JPG format with PinterestDownloader.com. why we developed Pinterest Downloader? because we noticed that Pinterest does not allow to download videos. Due to which people were facing a lot of trouble in downloading Pinterest videos. Pinterest Downloader is a solution for those who want to download Pinterest videos for the free and easy way.
</p>
<h1 className='text-4xl font-bold text-[#e60a23] text-center mb-2'>How to download Pinterest Videos, Images or Gif</h1>
<p className='text-left px-52 text-sm'>
Pinterest Downloader is easy-to-use for you. You can easily download videos from Pinterest without any limitations. Also, you do not need any registration or to pay a fee for the download. This tool is completely free. Follow the simple steps below to download Pinterest videos online.</p>
<ul className="list-disc px-56">
  <li>Open Pinterest App and select the video or image or gif which you want to download.</li>
  <li>Tap on ••• icon at the top right corner of the Pinterest app if you are using the latest version of the Pinterest app then Tap on ••• icon at the bottom right corner of the app. After taping ••• icon then tap on the copy link.</li>
<li>Paste the video Url in the Download Input Box, and Tap on Download button.</li>
<li>You can see the preview of your download file and there Download button just below it.</li>
<li>Tap on the Download button to download. Pinterest video or image or gif will be download to your device.</li>

</ul>
<h1 className='text-4xl font-bold text-[#e60a23] text-center mb-2'>Video Guide</h1>
<div className='flex flex-row justify-center'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/UEEwiL8kuXA?si=Z0cetQhYQJwoYAta" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

</div>
<div className='flex flex-row justify-center'>
<section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2
            className="text-4xl font-manrope text-center font-bold text-[#e60a23] leading-[3.25rem]"
          >
            Frequently asked questions
          </h2>
        </div>
        <div className="accordion-group" data-accordion="default-accordion">
          <div
            className="accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4 active"
            id="basic-heading-one-with-icon"
          >
            <button
              className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
              aria-controls="basic-collapse-one-with-icon"
            >
              <h5>How can I reset my password?</h5>
              <svg
                className="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600 origin-center"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 18V6"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <svg
                className="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <div
              id="basic-collapse-one-with-icon"
              className="accordion-content w-full overflow-hidden pr-4"
              aria-labelledby="basic-heading-one"
              style={{
                maxHeight:'250px'
              }}
    
            >
              <p className="text-base text-gray-900 font-normal leading-6">
                To create an account, find the 'Sign up' or 'Create account'
                button, fill out the registration form with your personal
                information, and click 'Create account' or 'Sign up.' Verify
                your email address if needed, and then log in to start using the
                platform.
              </p>
            </div>
          </div>
          <div
            className="accordion border border-solid border-gray-300 p-4 rounded-xl accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4"
            id="basic-heading-two-with-icon"
          >
            <button
              className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
              aria-controls="basic-collapse-two-with-icon"
            >
              <h5>How do I update my billing information?</h5>
              <svg
                className="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 18V6"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <svg
                className="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <div
              id="basic-collapse-two-with-icon"
              className="accordion-content w-full overflow-hidden pr-4"
              aria-labelledby="basic-heading-two"
            >
              <p className="text-base text-gray-900 font-normal leading-6">
                To create an account, find the 'Sign up' or 'Create account'
                button, fill out the registration form with your personal
                information, and click 'Create account' or 'Sign up.' Verify
                your email address if needed, and then log in to start using the
                platform.
              </p>
            </div>
          </div>
          <div
            className="accordion border border-solid border-gray-300 p-4 rounded-xl accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4"
            id="basic-heading-three-with-icon"
          >
            <button
              className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
              aria-controls="basic-collapse-three-with-icon"
            >
              <h5>How can I contact customer support?</h5>
              <svg
                className="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 18V6"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <svg
                className="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <div
              id="basic-collapse-three-with-icon"
              className="accordion-content w-full overflow-hidden pr-4"
              aria-labelledby="basic-heading-three"
            >
              <p className="text-base text-gray-900 font-normal leading-6">
                To create an account, find the 'Sign up' or 'Create account'
                button, fill out the registration form with your personal
                information, and click 'Create account' or 'Sign up.' Verify
                your email address if needed, and then log in to start using the
                platform.
              </p>
            </div>
          </div>
          <div
            className="accordion border border-solid border-gray-300 p-4 rounded-xl accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4"
            id="basic-heading-three-with-icon"
          >
            <button
              className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
              aria-controls="basic-collapse-three-with-icon"
            >
              <h5>How do I delete my account?</h5>
              <svg
                className="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18M12 18V6"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <svg
                className="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <div
              id="basic-collapse-three-with-icon"
              className="accordion-content w-full overflow-hidden pr-4"
              aria-labelledby="basic-heading-three"
              
            >
              <p className="text-base text-gray-900 font-normal leading-6">
                To create an account, find the 'Sign up' or 'Create account'
                button, fill out the registration form with your personal
                information, and click 'Create account' or 'Sign up.' Verify
                your email address if needed, and then log in to start using the
                platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
                                            
</div>
</div>

                </div>
            
            
   
    </div>
   </>
  )
}
