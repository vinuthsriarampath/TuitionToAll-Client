export class GradingSubmissionRequest {
  marksGained!: number;

  constructor(marksGained?: number) {
    if (marksGained !== undefined) {
      this.marksGained = marksGained;
    }
  }
}
