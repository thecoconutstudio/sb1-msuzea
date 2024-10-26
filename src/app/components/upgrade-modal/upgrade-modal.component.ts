import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PricingTier {
  name: string;
  price: number;
  credits: number;
  features: string[];
  recommended?: boolean;
}

@Component({
  selector: 'app-upgrade-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upgrade-modal.component.html',
  styleUrls: ['./upgrade-modal.component.scss']
})
export class UpgradeModalComponent {
  @Output() close = new EventEmitter<void>();

  pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      price: 0,
      credits: 0,
      features: [
        'View community designs',
        'Basic design tools',
        'Pay-per-credit option',
        'Community support'
      ]
    },
    {
      name: 'Starter',
      price: 9,
      credits: 20,
      features: [
        '20 credits monthly',
        'Download designs in HD',
        'Basic design customization',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      price: 17,
      credits: 40,
      recommended: true,
      features: [
        '40 credits monthly',
        'AI Body Mapping (15 credits/use)',
        'Advanced customization tools',
        'Priority support'
      ]
    },
    {
      name: 'Premium',
      price: 42,
      credits: 100,
      features: [
        '100 credits monthly',
        'Unlimited AI Body Mapping',
        'Custom style training',
        'Dedicated support'
      ]
    },
  ];

  selectPlan(tier: PricingTier) {
    console.log('Selected plan:', tier.name);
    // Implement plan selection logic here
  }
}