


CREATE TABLE public.tbl_projectjobs (
    jobid integer NOT NULL,
    project_id integer,
    zipname character varying(30),
    cdt timestamp with time zone DEFAULT now(),
    status character varying(15) DEFAULT 'STARTED'::character varying,
    progress integer DEFAULT 0,
    error_message character varying(500),
    completed_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.tbl_projectjobs OWNER TO admin;

--
-- TOC entry 225 (class 1259 OID 33214)
-- Name: tbl_projectjobs_jobid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tbl_projectjobs ALTER COLUMN jobid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_projectjobs_jobid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 33189)
-- Name: tbl_projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_projects (
    project_id integer NOT NULL,
    project_name character varying(50),
    project_description character varying(200),
    is_deleted boolean DEFAULT false NOT NULL,
    cdt date DEFAULT now()
);


ALTER TABLE public.tbl_projects OWNER TO admin;

--
-- TOC entry 221 (class 1259 OID 33188)
-- Name: tbl_projects_project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tbl_projects ALTER COLUMN project_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_projects_project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 33198)
-- Name: tbl_projectsfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_projectsfiles (
    projectfileid integer CONSTRAINT "tbl_projectsFiles_projectFileID_not_null" NOT NULL,
    projectfilename character varying(200),
    projectfilekey character varying(50),
    projectfilesize numeric(1000,2),
    project_id integer,
    cdt date DEFAULT now(),
    mimetype character varying(15)
);


ALTER TABLE public.tbl_projectsfiles OWNER TO admin;

--
-- TOC entry 224 (class 1259 OID 33205)
-- Name: tbl_projectsfiles_projectfileid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tbl_projectsfiles ALTER COLUMN projectfileid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tbl_projectsfiles_projectfileid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 33173)
-- Name: tbl_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_users (
    user_id integer CONSTRAINT "tbl_users_userID_not_null" NOT NULL,
    email_id character varying(50),
    password character varying(250),
    salt character varying(250),
    is_active boolean DEFAULT true CONSTRAINT "tbl_users_isActive_not_null" NOT NULL,
    is_deleted boolean DEFAULT false CONSTRAINT "tbl_users_isDeleted_not_null" NOT NULL,
    cdt date DEFAULT CURRENT_DATE NOT NULL,
    access_token character varying(250)
);


ALTER TABLE public.tbl_users OWNER TO admin;

--
-- TOC entry 219 (class 1259 OID 33172)
-- Name: tbl_users_userID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_users_userID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_users_userID_seq" OWNER TO admin;

--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 219
-- Name: tbl_users_userID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_users_userID_seq" OWNED BY public.tbl_users.user_id;


--
-- TOC entry 4770 (class 2604 OID 33176)
-- Name: tbl_users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users ALTER COLUMN user_id SET DEFAULT nextval('public."tbl_users_userID_seq"'::regclass);


--
-- TOC entry 4939 (class 0 OID 33189)
-- Dependencies: 222
-- Data for Name: tbl_projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (1, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (2, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (3, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (4, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (5, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (6, NULL, 'sdf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (7, NULL, 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (8, NULL, 'dsf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (9, 'sdf', 'dsf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (10, 'New Project Name', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (11, 'Newsdfdfs', 'kjdshfkjhskjhfks', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (14, 'sdf', 'sfsdfs', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (12, 'New Project Name', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (13, 'ffdfkj', 'kjlkdsf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (15, 'New Project Name', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (16, 'sdf', 'dsfsfsd', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (17, 'New Project Name', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (18, NULL, 'jhkfdskf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (19, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (20, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (21, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (22, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (23, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (24, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (25, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (26, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (27, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (28, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (29, 'New Project Namesdf', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (32, 'sdf', 'dsf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (30, 'New Project Name', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (31, 'dsf', 'jsfksf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (33, 'New Project Name', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (34, 'dsfh', 'kjflksjdfs', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (36, 'New Project Name', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (35, 'sdfm', 'kdshkhfk', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (37, 'sdjfh', 'jkhkhdskf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (38, 'sdkjhk', 'ljljlfjljsldf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (39, 'sdfkj', 'lkjljdlkjflkds', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (40, 'ksjdhfkj', 'ljljlfjdslf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (41, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (42, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (44, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (43, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (45, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (46, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (47, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (48, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (49, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (50, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (51, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (52, NULL, NULL, true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (53, 'dsf', 'lfds', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (54, 'New Project Nameja', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (55, 'ksahk', 'hkjhdsksf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (56, 'kjsdhf', 'f', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (58, 'New Project Namesdf', 'Project description', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (57, 'kdsfkhkshfl', 'kjldsjfljsdlf', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (59, 'slkjfd', 'lkjlkfds', true, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (60, 'New Project Name', 'Project description', false, '2026-06-12');
INSERT INTO public.tbl_projects OVERRIDING SYSTEM VALUE VALUES (61, 'jhgtt', 'klhhkj', false, '2026-06-12');


--
-- TOC entry 4940 (class 0 OID 33198)
-- Dependencies: 223
-- Data for Name: tbl_projectsfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tbl_projectsfiles OVERRIDING SYSTEM VALUE VALUES (20, 'Vector (1).png', '1781436648813_wmmou71v3d.png', 317.00, 60, '2026-06-14', 'image/png');
INSERT INTO public.tbl_projectsfiles OVERRIDING SYSTEM VALUE VALUES (21, 'Vector.png', '1781436648816_57zam5toaxw.png', 318.00, 60, '2026-06-14', 'image/png');
INSERT INTO public.tbl_projectsfiles OVERRIDING SYSTEM VALUE VALUES (25, 'file_example_JPG_500kB.jpg', '1781528474259_7s236oc90vn.jpg', 555181.00, 60, '2026-06-15', 'image/jpeg');
INSERT INTO public.tbl_projectsfiles OVERRIDING SYSTEM VALUE VALUES (26, 'Vector.png', '1781533179379_zb199cld7qe.png', 318.00, 60, '2026-06-15', 'image/png');
INSERT INTO public.tbl_projectsfiles OVERRIDING SYSTEM VALUE VALUES (27, 'Vector (1).png', '1781533193742_0hv52pr4j6g.png', 317.00, 61, '2026-06-15', 'image/png');
INSERT INTO public.tbl_projectsfiles OVERRIDING SYSTEM VALUE VALUES (28, 'Vector (1).png', '1781598738972_pbbn1m2oslk.png', 317.00, 60, '2026-06-16', 'image/png');
INSERT INTO public.tbl_projectsfiles OVERRIDING SYSTEM VALUE VALUES (29, 'Vector.png', '1781598739008_f6gznwoacqi.png', 318.00, 60, '2026-06-16', 'image/png');


--
-- TOC entry 4937 (class 0 OID 33173)
-- Dependencies: 220
-- Data for Name: tbl_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tbl_users VALUES (2, 'john@mail.com', '$2b$10$Wfwo4zzXjzOJffFimGLGj.lulkSJvMiclNLu8nw7KXrqnsPvnRnc2', '$2b$10$Wfwo4zzXjzOJffFimGLGj.', true, false, '2026-03-30', NULL);


--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 225
-- Name: tbl_projectjobs_jobid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_projectjobs_jobid_seq', 134, true);


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 221
-- Name: tbl_projects_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_projects_project_id_seq', 61, true);


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 224
-- Name: tbl_projectsfiles_projectfileid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_projectsfiles_projectfileid_seq', 29, true);


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 219
-- Name: tbl_users_userID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_users_userID_seq"', 2, true);


--
-- TOC entry 4788 (class 2606 OID 33221)
-- Name: tbl_projectjobs tbl_projectjobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_projectjobs
    ADD CONSTRAINT tbl_projectjobs_pkey PRIMARY KEY (jobid);


--
-- TOC entry 4786 (class 2606 OID 33203)
-- Name: tbl_projectsfiles tbl_projectsFiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_projectsfiles
    ADD CONSTRAINT "tbl_projectsFiles_pkey" PRIMARY KEY (projectfileid);


--
-- TOC entry 4784 (class 2606 OID 33197)
-- Name: tbl_projects tbl_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_projects
    ADD CONSTRAINT tbl_projects_pkey PRIMARY KEY (project_id);


--
-- TOC entry 4782 (class 2606 OID 33187)
-- Name: tbl_users tbl_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_pkey PRIMARY KEY (user_id);


-- Completed on 2026-06-16 14:38:34

--
-- PostgreSQL database dump complete
--


