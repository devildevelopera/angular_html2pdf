import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  @ViewChild('element' , {static: true}) element: ElementRef;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  download() {
    const options = {
      fileName: 'file.pdf',
      jsPDF: {
          orientation: 'portrait',
          unit: 'pt',
          format: [ 750,  1500]
        },
      margin: 10,
    };
    html2pdf()
      .from(this.element.nativeElement.innerHTML)
      .set(options)
      .save();
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
