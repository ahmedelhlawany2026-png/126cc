import type { Testimonial } from '@/components/Testimonials';

export const defaultTestimonials: Testimonial[] = [
  {
    nameAr: 'م. أحمد كامل', nameEn: 'Eng. Ahmed Kamel',
    roleAr: 'مدير مرفق طبي', roleEn: 'Medical Facility Director',
    companyTag: 'bio',
    quoteAr: 'التزام حقيقي بالمعايير الطبية من أول يوم، وتواصل واضح طوال مراحل التنفيذ.',
    quoteEn: 'Genuine commitment to medical standards from day one, with clear communication throughout execution.',
    rating: 5
  },
  {
    nameAr: 'د. منى فريد', nameEn: 'Dr. Mona Farid',
    roleAr: 'مديرة معمل تحاليل', roleEn: 'Laboratory Director',
    companyTag: 'bio',
    quoteAr: 'فهم دقيق لمتطلبات السلامة الحيوية، وتنفيذ ما خدش الجدول الزمني للمعمل.',
    quoteEn: 'A precise understanding of biosafety requirements, delivered without disrupting the lab’s schedule.',
    rating: 5
  }
];

export interface FaqItem { qAr: string; qEn: string; aAr: string; aEn: string; }

export const defaultFaqs: FaqItem[] = [
  { qAr: 'هل التصميم مطابق للمعايير الطبية العالمية؟', qEn: 'Is the design compliant with international medical standards?', aAr: 'نعم، نلتزم بمعايير الجودة والسلامة الطبية المعتمدة في كل مشروع.', aEn: 'Yes, every project follows recognised medical quality and safety standards.' },
  { qAr: 'هل يمكن التنفيذ أثناء تشغيل المنشأة؟', qEn: 'Can work be done while the facility is operating?', aAr: 'نعم، نخطط مراحل التنفيذ لتقليل التأثير على العمل الطبي اليومي.', aEn: 'Yes, we phase execution to minimise disruption to daily medical operations.' },
  { qAr: 'كم تستغرق مدة تجهيز غرفة عمليات؟', qEn: 'How long does fitting out an operating theatre take?', aAr: 'يعتمد على حجم الغرفة ومتطلباتها، ويُحدَّد جدول دقيق بعد المعاينة.', aEn: 'It depends on room size and requirements; an exact schedule follows the site visit.' },
  { qAr: 'هل يوجد ضمان على الأنظمة المُنفَّذة؟', qEn: 'Is there a warranty on installed systems?', aAr: 'نعم، بعقد رسمي يوضح مدة الضمان لكل نظام.', aEn: 'Yes, covered by a formal contract specifying the warranty period for each system.' }
];
