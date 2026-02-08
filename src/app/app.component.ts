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

    if (!subject) {
      this.errorMessage = 'Please enter a topic to debate.';
      this.resetDebate();
      return;
    }

    this.errorMessage = '';
    this.isDebating = true;
    this.messages = this.createDebate(subject);
    this.verdict = this.createVerdict(subject);
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
        content: `I’ll champion a structured plan for ${focus}: clarify the audience, set performance targets, and choose a rendering stack early to avoid rework.`,
      },
      {
        speaker: 'Bot Echo',
        role: 'con',
        content: `I’ll pressure-test that. Before picking tools, we need rapid prototypes to validate fun and feel. Over-planning can stall progress on ${focus}.`,
      },
      {
        speaker: 'Bot Atlas',
        role: 'pro',
        content: `Fair push. We can balance both by selecting a Python-friendly engine like Godot or Panda3D, then establishing modules for assets, physics, and AI loops.`,
      },
      {
        speaker: 'Bot Echo',
        role: 'con',
        content: `Prototype loops should ship weekly. Use tight CI, scene prefabs, and telemetry to measure frame times and player flow for ${focus}.`,
      },
    ];
  }

  private createVerdict(topic: string): string {
    const focus = this.emphasize(topic);

    return `Blend both strategies for ${focus}: prototype fast to test feel, but stabilize around a documented engine setup (rendering, physics, asset pipeline) with automated checks so improvements are measurable and reversible.`;
  }

  private emphasize(text: string): string {
    const normalized = text.trim();
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
}
