<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
        return Inertia::render('Post/Index', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'body'  => ['required']
        ])->validate();

        Post::create($request->all());
        return redirect(route('posts.index'))->with([
            'success' => 'Data berhasil ditambahkan',
            'type'    => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'body'  => ['required']
        ])->validate();

        Post::find($id)->update($request->all());
        return redirect(route('posts.index'))->with([
            'success' => 'Data berhasil diubah',
            'type'    => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Post::find($id)->delete();
        return redirect(route('posts.index'))->with([
            'success' => 'Data berhasil dihapus',
            'type'    => 'delete'
        ]); 
    }
}
