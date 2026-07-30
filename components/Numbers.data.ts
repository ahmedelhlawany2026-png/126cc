export interface Stat {
  target: number;
  prefix: string;
  suffix: string;
  labelAr: string;
  labelEn: string;
}

export const defaultStats: Stat[] = [
  { target: 100, prefix: '+', suffix: '', labelAr: 'مشروع', labelEn: 'Projects' },
  { target: 100000, prefix: '', suffix: ' m²', labelAr: 'مساحة منفذة', labelEn: 'Sq. metres delivered' },
  { target: 50, prefix: '+', suffix: '', labelAr: 'عميل', labelEn: 'Clients' },
  { target: 50, prefix: '+', suffix: '', labelAr: 'مهندس', labelEn: 'Engineers' },
  { target: 12, prefix: '+', suffix: '', labelAr: 'مدينة', labelEn: 'Cities' },
  { target: 95, prefix: '', suffix: '%', labelAr: 'رضا العملاء', labelEn: 'Client satisfaction' }
];
