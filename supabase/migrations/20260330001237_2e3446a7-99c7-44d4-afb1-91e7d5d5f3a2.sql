-- Create storage bucket for room photos
INSERT INTO storage.buckets (id, name, public) VALUES ('room-photos', 'room-photos', true);

-- Create room_photos table
CREATE TABLE public.room_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
  storage_path text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.room_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can view photos
CREATE POLICY "Anyone can view room photos" ON public.room_photos
  FOR SELECT TO public USING (true);

-- Admins can manage photos
CREATE POLICY "Admins can manage room photos" ON public.room_photos
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Storage policies: anyone can view
CREATE POLICY "Anyone can view room photos" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'room-photos');

-- Admins can upload
CREATE POLICY "Admins can upload room photos" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'room-photos' AND has_role(auth.uid(), 'admin'::app_role)
  );

-- Admins can delete
CREATE POLICY "Admins can delete room photos" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'room-photos' AND has_role(auth.uid(), 'admin'::app_role)
  );

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_photos;