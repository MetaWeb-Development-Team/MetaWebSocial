import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const Home = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    //processing for data retrieval
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/files').then((res) => {
            setFiles(res.data.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    //what gets returned to user
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'> Files List </h1>
                <Link to='/files/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>

        {/*//after loading the first division, check loading*/}

            {loading ? (<Spinner />) :
                (<table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>FileName</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Data</th>
                    {/*//each data member w/in db can be shown here using the outline as above*/}
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={file._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {file.filename}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {file.filedata}
                                </td>
                                {/*//each data member w/in db can be shown here using the outline as above

                                //now we connect to the other pages*/}
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/files/details/${file._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/files/edit/${file._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/files/delete/${file._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
        </div>
    )
}

export default Home