import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/shared/models/favorite.models';
import { Media } from 'src/app/shared/models/media.models';
import { Post } from 'src/app/shared/models/post.models';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { MediaService } from 'src/app/shared/services/media.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(
    private favoriteService: FavoriteService,
    private mediaService: MediaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFavorites()
  }

  get favorites(): Favorite[] {
    return this.favoriteService.myFavorites
  }

  private getFavorites(): void {
    this.favoriteService.getMyFavorites().subscribe((res: Favorite[]) => {
      this.favoriteService.myFavorites = res
      
      for (const f of this.favoriteService.myFavorites) {
        this.getImage(f)
      }
    })
  }

  private getImage(favorite: Favorite) {
    this.mediaService.getImage(favorite.post.imageId).subscribe((res: Media) => {
      favorite.imageUrl = res.ImageUrl
    })
  }

  seeDetails(post: Post) {
    this.router.navigate(['/post/' + post.id])
  }
}
