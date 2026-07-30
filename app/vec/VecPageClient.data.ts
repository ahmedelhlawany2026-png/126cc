import type { Testimonial } from '@/components/Testimonials';

export const defaultTestimonials: Testimonial[] = [
  {
    nameAr: 'م. كريم عادل', nameEn: 'Eng. Karim Adel',
    roleAr: 'مطوّر عقاري', roleEn: 'Real Estate Developer',
    companyTag: 'vec',
    quoteAr: 'فريق هندسي محترف، من التصميم للتراخيص، وإدارة مشروع واضحة من أول لحظة.',
    quoteEn: 'A professional engineering team, from design through licensing, with clear project management from the start.',
    rating: 5
  },
  {
    nameAr: 'شريف توفيق', nameEn: 'Sherif Tawfik',
    roleAr: 'مدير تشغيل، سلسلة متاجر', roleEn: 'Operations Manager, Retail Chain',
    companyTag: 'vec',
    quoteAr: 'التنسيق بين التصميم والتنفيذ كان سلس في كل فروعنا، وده وفّر علينا وقت كبير.',
    quoteEn: 'Coordination between design and execution was seamless across all our branches, saving us significant time.',
    rating: 5
  }
];

export interface FaqItem { qAr: string; qEn: string; aAr: string; aEn: string; }

export const defaultFaqs: FaqItem[] = [
  { qAr: 'هل تقدمون دراسات الجدوى قبل التصميم؟', qEn: 'Do you provide feasibility studies before design?', aAr: 'نعم، نبدأ كل مشروع كبير بدراسة جدوى وتخطيط استراتيجي واضح.', aEn: 'Yes, every major project starts with a clear feasibility study and strategic plan.' },
  { qAr: 'هل تتعاملون مع استخراج التراخيص؟', qEn: 'Do you handle licensing?', aAr: 'نعم، ننسق مع الجهات الحكومية ونتابع استخراج كل التراخيص اللازمة.', aEn: 'Yes, we coordinate with authorities and follow up on all required licences.' },
  { qAr: 'هل تستخدمون BIM في كل المشاريع؟', qEn: 'Do you use BIM on all projects?', aAr: 'نستخدم BIM في المشاريع التي تستفيد من التنسيق بين التخصصات والحصر الكمي الدقيق.', aEn: 'We apply BIM on projects that benefit from cross-discipline coordination and precise quantity surveying.' },
  { qAr: 'هل يمكنكم الإشراف على التنفيذ بعد التصميم؟', qEn: 'Can you supervise execution after design?', aAr: 'نعم، نوفر إدارة مشاريع وإشراف هندسي كامل حتى التسليم.', aEn: 'Yes, we provide full project management and engineering supervision through to handover.' }
];
