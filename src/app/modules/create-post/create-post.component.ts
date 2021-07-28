import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Media } from 'src/app/shared/models/media.models';
import { Post } from 'src/app/shared/models/post.models';
import { MediaService } from 'src/app/shared/services/media.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  file: any = null
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
    private postService: PostService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', Validators.required]
    })
  }

  onFileChanged(event): void {
    this.file = event.target.files[0]
  }

  submit(): void {
    const description = this.form.controls.description.value

    if (!this.file) {
      this.toastr.warning('You must upload an image')
      return
    }

    this.mediaService.uploadImage(this.file).subscribe((res: Media) => {
      const post = new Post()
      post.authorId = this.userService.user.id
      post.imageId = +res.Id
      post.description = description
      
      this.postService.createPost(post).subscribe((res: Post) => {
        this.toastr.success('Post successfully created')
        this.router.navigate(['/post/' + res.id])
      })
    })
  }
}
