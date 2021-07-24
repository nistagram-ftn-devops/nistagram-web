import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPageComponent } from './post-page.component';
import { PostPageRoutingModule } from './post-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PostPageComponent
  ],
  imports: [
    CommonModule,
    PostPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class PostPageModule { }
