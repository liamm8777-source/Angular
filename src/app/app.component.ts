import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type DebateRole = 'pro' | 'con';

interface DebateMessage {
  speaker: string;
  role: DebateRole;
  content: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AI Debate Arena';
  topic = '';
  errorMessage = '';
  isDebating = false;
  messages: DebateMessage[] = [];
  verdict = '';

  startDebate(): void {
    const subject = this.topic.trim();

    if (!this.isValidTopic(subject)) {
      this.errorMessage = 'Please enter a topic to debate.';
      this.resetDebate();
      return;
    }

    this.errorMessage = '';
    this.isDebating = true;
    this.messages = this.createDebate(subject);
    this.verdict = this.createVerdict(subject);
  }

  private isValidTopic(topic: string): boolean {
    return !!topic;
  }

  private resetDebate(): void {
    this.messages = [];
    this.verdict = '';
    this.isDebating = false;
  }

  private createDebate(topic: string): DebateMessage[] {
    const focus = this.emphasize(topic);

    return [
      {
        speaker: 'Bot Atlas',
        role: 'pro',
        content: `I’ll champion a structured plan for ${focus}: clarify the audience, set success criteria, and define milestones so we keep momentum.`,
      },
      {
        speaker: 'Bot Echo',
        role: 'con',
        content: `I’ll pressure-test that. Before locking plans, we need quick experiments to surface unknowns. Over-planning can stall progress on ${focus}.`,
      },
      {
        speaker: 'Bot Atlas',
        role: 'pro',
        content: `Fair push. We can balance both by choosing a lean toolkit, documenting decisions, and keeping workstreams modular so changes stay safe.`,
      },
      {
        speaker: 'Bot Echo',
        role: 'con',
        content: `Prototype loops should ship weekly. Use tight feedback cycles, small reviews, and lightweight telemetry to keep ${focus} aligned.`,
      },
    ];
  }

  private createVerdict(topic: string): string {
    const focus = this.emphasize(topic);

    return `Blend both strategies for ${focus}: prototype fast to learn, but stabilize around a simple, documented plan with automated checks so improvements stay measurable and reversible.`;
  }

  getRoleLabel(role: DebateRole): string {
    return role === 'pro' ? 'Proposer' : 'Challenger';
  }

  private emphasize(text: string): string {
    const normalized = text.trim();
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
}
