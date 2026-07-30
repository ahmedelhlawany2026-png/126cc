import type { Testimonial } from '@/components/Testimonials';

export const defaultTestimonials: Testimonial[] = [
  {
    nameAr: 'سارة المصري', nameEn: 'Sara El-Masry',
    roleAr: 'صاحبة فيلا', roleEn: 'Villa Owner',
    companyTag: 'home',
    quoteAr: 'التشطيب فاق التوقعات، والفريق كان دقيق في المواعيد ومتفهم لكل التفاصيل اللي طلبناها.',
    quoteEn: 'The finishing exceeded expectations, and the team was punctual and attentive to every detail we asked for.',
    rating: 5
  },
  {
    nameAr: 'محمد رشدي', nameEn: 'Mohamed Roshdy',
    roleAr: 'مالك شقة', roleEn: 'Apartment Owner',
    companyTag: 'home',
    quoteAr: 'من المعاينة للتسليم كل حاجة كانت واضحة ومكتوبة، وده اللي طمّنّي طول المشروع.',
    quoteEn: 'From the site visit to handover, everything was clear and documented — that gave me confidence throughout.',
    rating: 5
  }
];

export interface FaqItem { qAr: string; qEn: string; aAr: string; aEn: string; }

export const defaultFaqs: FaqItem[] = [
  { qAr: 'هل يوجد تقسيط؟', qEn: 'Is installment payment available?', aAr: 'نعم، نوفر خطط دفع مرنة تُناقش عند التعاقد حسب حجم المشروع.', aEn: 'Yes, we offer flexible payment plans discussed at contracting based on project scope.' },
  { qAr: 'كم تستغرق مدة التنفيذ؟', qEn: 'How long does execution take?', aAr: 'تختلف حسب المساحة ونوع التشطيب، ويُحدَّد جدول زمني دقيق بعد المعاينة.', aEn: 'It varies by size and finishing type; an exact timeline is set after the site visit.' },
  { qAr: 'هل توجد معاينة قبل البدء؟', qEn: 'Is there a site visit before starting?', aAr: 'نعم، معاينة مجانية لتحديد التفاصيل والتكلفة بدقة.', aEn: 'Yes, a free site visit to accurately define the details and cost.' },
  { qAr: 'هل يوجد ضمان على التنفيذ؟', qEn: 'Is there a warranty on the work?', aAr: 'نعم، جميع مشاريعنا مضمونة بعقد رسمي يوضح مدة الضمان.', aEn: 'Yes, all our projects are covered by a formal contract specifying the warranty period.' },
  { qAr: 'هل الأسعار شاملة الخامات؟', qEn: 'Do prices include materials?', aAr: 'يتم توضيح ذلك بالتفصيل في العرض السعري حسب اختيارك لمستوى التشطيب.', aEn: 'This is detailed in the quotation based on your chosen finishing level.' }
];
