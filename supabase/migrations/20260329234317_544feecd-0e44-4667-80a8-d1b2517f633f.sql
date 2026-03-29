
-- Testimonials table
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  text text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  is_visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible testimonials" ON public.testimonials
  FOR SELECT TO public USING (is_visible = true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Site settings key-value table
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings" ON public.site_settings
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage site settings" ON public.site_settings
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed default settings
INSERT INTO public.site_settings (key, value) VALUES
  ('property_title', 'Sewa Apartemen Gresik – Unit Gunawangsa'),
  ('property_description', 'Sewa apartemen Gunawangsa Gresik langsung dari owner. Unit bersih, nyaman, dan aman untuk transit maupun menginap.'),
  ('whatsapp_number', '6281234567890'),
  ('whatsapp_message', 'Halo, saya ingin pesan kamar apartemen Gunawangsa Gresik'),
  ('price_transit', '75000'),
  ('price_daily', '300000');
