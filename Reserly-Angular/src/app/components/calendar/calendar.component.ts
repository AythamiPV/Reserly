import { Component, OnInit, OnDestroy, AfterViewInit, Renderer2, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  private monthYear: HTMLElement | null = null;
  private prevMonthBtn: HTMLElement | null = null;
  private nextMonthBtn: HTMLElement | null = null;
  private calendarDays: HTMLElement | null = null;
  private dateInput: HTMLInputElement | null = null;
  private currentDate: Date = new Date(); // Para controlar el mes y año mostrados
  private selectedDate: Date | null = null; // Para almacenar la fecha seleccionada por el usuario

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    console.log("✅ CalendarComponent ngOnInit ejecutado");
  }

  ngAfterViewInit(): void {
    console.log("✅ CalendarComponent ngAfterViewInit ejecutado");
    this.monthYear = this.el.nativeElement.querySelector(".month-year");
    this.prevMonthBtn = this.el.nativeElement.querySelector(".prev-month");
    this.nextMonthBtn = this.el.nativeElement.querySelector(".next-month");
    this.calendarDays = this.el.nativeElement.querySelector(".calendar-days");
    this.dateInput = this.el.nativeElement.querySelector("#date-input");

    if (!this.monthYear || !this.prevMonthBtn || !this.nextMonthBtn || !this.calendarDays || !this.dateInput) {
      console.warn("⚠️ Elementos del calendario no encontrados en ngAfterViewInit.");
      return;
    }

    this.renderCalendar();

    this.renderer.listen(this.prevMonthBtn, 'click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    });

    this.renderer.listen(this.nextMonthBtn, 'click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    });
  }

  ngOnDestroy(): void {
    console.log("❌ CalendarComponent ngOnDestroy ejecutado");
    // Limpiar listeners si es necesario
  }

  renderCalendar() {
    if (!this.monthYear || !this.calendarDays || !this.dateInput) {
      console.warn("⚠️ Elementos del calendario no encontrados en renderCalendar.");
      return;
    }

    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const prevLastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0);

    this.monthYear.textContent = firstDay.toLocaleString("en-US", { month: "long", year: "numeric" });
    this.calendarDays.innerHTML = "<div class='day'>M</div><div class='day'>T</div><div class='day'>W</div><div class='day'>T</div><div class='day'>F</div><div class='day'>S</div><div class='day'>S</div>";

    let startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = prevLastDay.getDate() - startDay + 1; i <= prevLastDay.getDate(); i++) {
      const dateElement = this.renderer.createElement('div');
      this.renderer.addClass(dateElement, 'date');
      this.renderer.addClass(dateElement, 'inactive');
      this.renderer.setAttribute(dateElement, 'data-disabled', 'true');
      const text = this.renderer.createText(i.toString());
      this.renderer.appendChild(dateElement, text);
      this.renderer.appendChild(this.calendarDays, dateElement);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dateElement = this.renderer.createElement('div');
      this.renderer.addClass(dateElement, 'date');
      const text = this.renderer.createText(i.toString());
      this.renderer.appendChild(dateElement, text);
      this.renderer.appendChild(this.calendarDays, dateElement);

      this.renderer.listen(dateElement, 'click', () => {
        this.calendarDays?.querySelectorAll(".date").forEach(d => this.renderer.removeClass(d, "selected"));
        this.renderer.addClass(dateElement, "selected");
        const day = i.toString().padStart(2, '0');
        const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = this.currentDate.getFullYear();
        if (this.dateInput) {
          this.dateInput.value = `${month}/${day}/${year}`;
          this.selectedDate = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10)); // Almacena la fecha seleccionada
          this.renderCalendar(); // Volvemos a renderizar para actualizar la selección visual
          this.loadCompanyData();
        }
      });

      // Marcar la fecha previamente seleccionada
      if (this.selectedDate &&
        this.selectedDate.getFullYear() === this.currentDate.getFullYear() &&
        this.selectedDate.getMonth() === this.currentDate.getMonth() &&
        this.selectedDate.getDate() === i) {
        this.renderer.addClass(dateElement, "selected");
      }
    }

    let remainingDays = (7 - (this.calendarDays.children.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      const dateElement = this.renderer.createElement('div');
      this.renderer.addClass(dateElement, 'date');
      this.renderer.addClass(dateElement, 'inactive');
      this.renderer.setAttribute(dateElement, 'data-disabled', 'true');
      const text = this.renderer.createText(i.toString());
      this.renderer.appendChild(dateElement, text);
      this.renderer.appendChild(this.calendarDays, dateElement);
    }

    // Marcar el día actual solo si no hay una fecha seleccionada en este mes
    const today = new Date();
    if (!this.selectedDate ||
      this.selectedDate.getFullYear() !== this.currentDate.getFullYear() ||
      this.selectedDate.getMonth() !== this.currentDate.getMonth()) {
      if (today.getFullYear() === this.currentDate.getFullYear() && today.getMonth() === this.currentDate.getMonth()) {
        const todayDate = today.getDate();
        Array.from(this.calendarDays.children)
          .filter(day => day.textContent === todayDate.toString() && !day.classList.contains("inactive"))
          .forEach(day => this.renderer.removeClass(day, "selected")); // Removemos la clase 'selected' del día actual si hay una fecha seleccionada en otro mes
        const todayElement = Array.from(this.calendarDays.children).find(day => day.textContent === todayDate.toString() && !day.classList.contains("inactive"));
        if (todayElement && !this.selectedDate) {
          this.renderer.addClass(todayElement, "selected");
          const day = todayDate.toString().padStart(2, '0');
          const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
          const year = this.currentDate.getFullYear();
          if (this.dateInput) {
            this.dateInput.value = `${month}/${day}/${year}`;
          }
        }
      }
    }
  }

  loadCompanyData() {
    console.log("📅 loadCompanyData() llamado desde el Calendar");
    if (this.selectedDate) {
      console.log("Fecha seleccionada:", this.selectedDate);
      // Puedes emitir un evento con this.selectedDate al componente padre
    }
  }
}
