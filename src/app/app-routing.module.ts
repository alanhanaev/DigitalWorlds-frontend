import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent }      from './posts/posts.component';
import { AddPostComponent }      from './add-post/add-post.component';
import { PostComponent }      from './post/post.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:post_id', component: PostComponent },
  { path: 'add_post', component: AddPostComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}