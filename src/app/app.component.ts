import { DatabaseService } from './../rxdb/rxdb.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  public constructor(public dbService: DatabaseService) {}

  async ngOnInit() {
    const db = await this.dbService.get()
    db.group!.find().where({title: "My Title"}) // ??
  }
  
}
