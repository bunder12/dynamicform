import React, { useState } from 'react'
import { storage } from '@/lib/firebase'
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import axios from 'axios'
import useSWR from 'swr';

const Index = () => {

  const [dataUser, setDataUser] = useState({
    full_name: '',
    age: 0,
    gender: '',
    profile_picture: '',
    bio: '',
    hobbies: '',
    subscription: '',
    // language_proficiency: ''
  })
  const [progressPercentKetua, setProgressPercentKetua] = useState(0)

  const url: string = `http://localhost:3000/api/get`
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(url, fetcher, {refreshInterval: 100})
  console.log(data)

  const handlePost = async(e:any) => {
    e.preventDefault()
    console.log(dataUser)
    axios.post(`http://localhost:3000/api/post`, dataUser)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const handleFileKetua = (e: any) => {
    e.preventDefault()
    const file = e.target.files[0]

    const storageRef = ref(storage, `dynamicform/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercentKetua(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDataUser({...dataUser, profile_picture: downloadURL})
        });
      }
    );
  }

  const handleChangeHobbies = (e:any) => {
    const { value, checked} = e.target
    const {hobbies} = dataUser
    console.log(`${value} is ${checked}`);
    if (checked) {
      setDataUser({
        ...dataUser,
        hobbies: value,
      });
    }
  }

  const handleChangeInput = (e:any, fieldName:any) => {
    e.preventDefault()
    if(fieldName === 'full_name'){
      setDataUser({...dataUser, full_name: e.target.value})
    }else if(fieldName === 'age'){
      setDataUser({...dataUser, age: Number(e.target.value)})
    }else if(fieldName === 'profile_picture'){
      setDataUser({...dataUser, profile_picture: e.target.value})
    }else if(fieldName === 'gender'){
      setDataUser({...dataUser, gender: 'Male'})
    }else if(fieldName === 'hobbies'){
      setDataUser({...dataUser, hobbies: 'Music'})
    }else if(fieldName === 'subscription'){
      setDataUser({...dataUser, subscription: 'Basic'})
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='shadow-md rounded-md px-12 py-2' onSubmit={(e) => handlePost(e)}>
      {
        data?.fields?.map((res:any, index:number) => {
          const atributInput = res?.field_type === 'text' || res?.field_type === 'number' || res?.field_type === 'file' || res?.field_type === 'radio' || res?.field_type === 'checkbox'
          // const attributTextArea = res?.field_type === 'textarea'
          const isOption = res?.field_name === 'gender' || res?.field_name === 'subscription' || res?.field_name === 'hobbies'
          return (
          <div key={index} className='flex flex-col mb-3'>
            { 
              atributInput ? 
              (
                <>
                <label className='mb-2'>{res?.field_label}</label>
                {
                  isOption?
                  <>
                  {
                  res?.field_name === 'gender' && (
                  data?.genders?.map((respon:any, index:number) => (
                    <div key={index}>
                      <label className='mr-2'>{respon.gender}</label>
                      <input 
                      onChange={(e) => handleChangeInput(e, res.field_name)}
                      name='gender'
                      type={res?.field_type} 
                      placeholder={res.field_name}
                      />
                    </div>
                  )))}
                  {
                  res?.field_name === 'subscription' && (
                  data?.subscriptions?.map((respon:any, index:number) => (
                    <div key={index} className='flex'>
                      <label className='mr-2'>{respon.sub}</label>
                      <input 
                      name='subscription'
                      onChange={(e) => handleChangeInput(e, res.field_name)}
                      type={res?.field_type} 
                      placeholder={res.field_name}
                      />
                    </div>
                  )))}
                  {
                  res?.field_name === 'hobbies' && (
                  data?.hobbi?.map((respon:any, index:number) => (
                    <div key={index}>
                      <input 
                      name='hobbies'
                      onChange={(e) => handleChangeInput(e, res.field_name)}
                      type={res?.field_type} 
                      placeholder={res.field_name}
                      />
                      <label className='ml-2'>{respon.hob}</label>
                    </div>
                  )))}
                  </>
                  :
                  <input
                  className='p-2 border-2 rounded-md focus:outline-none focus:outline-blue-400' 
                  onChange={(e) => handleChangeInput(e, res.field_name)}
                  type={res?.field_type} 
                  placeholder={res.field_name}
                  />
                }
                </>
              )
              :
              (
                <>
                <textarea className='p-2 border-2 rounded-md focus:outline-none focus:outline-blue-400' placeholder={res.field_name}  onChange={({target}) => setDataUser({...dataUser, bio: target.value})}/>
                </>
              )
            }
          </div>
          )
        })
      }
      <button className='py-2 px-4 bg-blue-400 rounded-md text-white' type='submit'>send</button>
      </form>
    </div>
  )
}

export default Index