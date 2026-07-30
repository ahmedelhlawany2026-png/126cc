export interface TimelineItem {
  year: string;
  tagAr: string;
  tagEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export const defaultTimeline: TimelineItem[] = [
  { year: '2012', tagAr: 'التأسيس', tagEn: 'Foundation', titleAr: 'البداية', titleEn: 'The Beginning',
    descAr: 'انطلقت رؤية الشركة بهدف واضح: تقديم حلول هندسية وتجهيزية عالية الجودة، قائمة على الاحترافية والابتكار ورضا العملاء.',
    descEn: "The company's vision launched with a clear goal: delivering high-quality engineering and fit-out solutions, built on professionalism, innovation, and client satisfaction." },
  { year: '', tagAr: 'النمو', tagEn: 'Growth', titleAr: 'المشاريع', titleEn: 'Projects',
    descAr: 'تنفيذ عشرات المشاريع الطبية والسكنية والتجارية عبر مصر، وبناء سجل حافل من الجودة والالتزام بالمواعيد.',
    descEn: 'Dozens of medical, residential and commercial projects delivered across Egypt, building a track record of quality and on-time delivery.' },
  { year: '', tagAr: 'الثقة', tagEn: 'Trust', titleAr: 'العملاء', titleEn: 'Clients',
    descAr: 'شراكات طويلة الأمد مع مطورين عقاريين وجهات طبية رائدة، أسست لثقة راسخة في السوق.',
    descEn: 'Long-term partnerships with leading developers and medical institutions, establishing solid market trust.' },
  { year: '', tagAr: 'التوسع', tagEn: 'Expansion', titleAr: 'مدن جديدة', titleEn: 'New Cities',
    descAr: 'امتداد الأعمال لأكثر من 12 مدينة، وتوسّع فرق الهندسة والتنفيذ لمواكبة الطلب المتزايد.',
    descEn: 'Operations expanded to more than 12 cities, growing engineering and execution teams to match rising demand.' },
  { year: 'Vision Group', tagAr: '', tagEn: '', titleAr: 'اليوم', titleEn: 'Today',
    descAr: 'ثلاث شركات متخصصة، رؤية واحدة، وفريق موحّد يخدم قطاعات الصحة والسكن والهندسة الاستشارية.',
    descEn: 'Three specialised companies, one vision, and a unified team serving healthcare, residential and consultancy engineering.' }
];
