// src/app/utils/date-utils.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes it available application-wide
})
export class DateUtilsService {
  /**
   * Formats a Date object into a readable string
   * @param date The date to format
   * @returns Formatted date string (e.g., "Jul 5, 2025, 10:30 AM") or empty string if no date provided
   */
  formatDate(date: Date | string | null | undefined): string {
    if (!date) return '';
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(date).toLocaleDateString('en-US', options);
  }
}