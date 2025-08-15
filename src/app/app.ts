import { Component, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import hljs from 'highlight.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('SQL Generator');
  protected readonly keyValue = signal<number | null>(null);
  protected readonly generatedSql = signal<string>('');
  
  @ViewChild('sqlCodeBlock') sqlCodeBlock!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    if (this.generatedSql()) {
      this.highlightCode();
    }
  }

  generateSQL() {
    const key = this.keyValue();
    if (key !== null && key !== undefined) {
      const sql = `select * from hoge_table where key = ${key};`;
      this.generatedSql.set(sql);
      
      setTimeout(() => {
        this.highlightCode();
      }, 0);
    }
  }

  private highlightCode() {
    if (this.sqlCodeBlock && this.generatedSql()) {
      this.sqlCodeBlock.nativeElement.innerHTML = hljs.highlight(
        this.generatedSql(),
        { language: 'sql' }
      ).value;
    }
  }

  onKeyValueChange(value: string) {
    const numValue = parseInt(value, 10);
    this.keyValue.set(isNaN(numValue) ? null : numValue);
  }
}
