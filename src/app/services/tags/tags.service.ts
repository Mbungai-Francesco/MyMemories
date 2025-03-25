import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Tag } from '../../types';
import { getUserTags } from '../../api/tagsApi';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private tagsSubject = new BehaviorSubject<Tag[]>([])
  tags$ = this.tagsSubject.asObservable()

  constructor() { }
  // Fetch all tags from the API and set them in the BehaviorSubject
  getAllUserTags(id:string, jwt : string){
    getUserTags(id,jwt).then((res) =>{
      if(res) this.setTags(res)
    })
  }

  // Set the tags in the BehaviorSubject
  // This will notify all subscribers of the new value
  setTags(tags : Tag[]){
    this.tagsSubject.next(tags)
  }
}
