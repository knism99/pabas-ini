import { useState, useEffect} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, usePage, Link, router} from "@inertiajs/react";

export default function Dashboard(props) {
    const {posts} = usePage().props;
    const {flashMessage, setFlashMessage} = useState(
        props.flash.success)
    const {flashType, setFlashType} =useState(
        props.flash.type);
    
    useEffect(() => {
            setFlashType(props.flash.type);
            setFlashMessage(props.flash.success);
            
            if (props.flash.success) {
                const timer = setTimeout(() => {
                    setFlashType(null);
                }, 3000);
                return () => clearTimeout(timer)
            }
    }, [props.flash])

    function destroy(e) {
        if(confirm("Apakah anda ingin menghapus data ini? ")) {
            router.delete(route('posts.destroy', e.currentTarget.id));
        }
    }
    return (
        <AuthenticatedLayout>
          auth={props.auth}
          user={props.auth.user}
          errors={props.errors}
          header={
            <h2 className="font-semibold text xl text-gray-500
                loading-tight">All Post</h2>
          }
          <Head title="Posts" />
          
          {/* kode verifikasi */}
          {flashMessage && (
            <div className={`fixed top-5 right-5 z-50 text-white px-5 py-3 rounded-lg shadow-lg ${flashType == "delete" ? "bg-red-500" : "bg-green-500"}`}>
              {flashMessage}
            </div>
          )}

          <div className="py-12">
            <div className="max-w-7x1 mx-auto sm:px-6 lg:px-5">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <link className="flex items-center px-6 py-2 text-white bg-gray-500" href={route("posts.create")}>
                            <span>New Post</span>
                            </link> 
                        </div>
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="text-white bg-gray-500">
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Body</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {posts && posts.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="border px-4 py-2 text-white text-center">
                                            {index + 1}                                        
                                        </td>
                                        <td className="border px-4 py-2 text-white text-center">
                                            {item.title}                                        
                                        </td>
                                        <td className="border px-4 py-2 text-white text-center">
                                            {item.body}                                        
                                        </td>
                                        <td className="border px-4 py-2 text-white text-center">
                                            <link href={route("posts.edit",item.id)}>Edit
                                            </link>      
                                            <button onClick={() => destroy(item.id)} id={item.id}
                                                type="button" className="ml-2 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-800"
                                            >Delete
                                            </button>                                  
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center border">No post found.

                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>

        </AuthenticatedLayout>
            
    )
}   
