
import { Envelope, Telephone, GeoAlt, Calendar } from "react-bootstrap-icons";

export function Overview({user}) {
  return (
    <div className=" py-4" style={{minHeight:"50px"}}>
      <div className="row g-4">
        {/* Profile Info */}
        <div className="col-md-6">
          <div className="p-4 bg-white rounded-4 shadow-sm">
            <h5 className="mb-4">Profile Information</h5>

            <div className="d-flex align-items-center gap-3 bg-light rounded p-2 mb-2">
              <Envelope className="text-secondary" />
              <span>{user?.email}</span>
            </div>

            <div className="d-flex align-items-center gap-3 bg-light rounded p-2 mb-2">
              <Telephone className="text-secondary" />
              <span>{user?.contact}</span>
            </div>

            <div className="d-flex align-items-center gap-3 bg-light rounded p-2 mb-2">
              <GeoAlt className="text-secondary" />
              <span>{user?.profile?.address[0]?.fullAddress}</span>
            </div>

            {/* <div className="d-flex align-items-center gap-3 bg-light rounded p-2 mb-2">
              <Calendar className="text-secondary" />
              <span>Member since January 2024</span>
            </div> */}
          </div>
        </div>

      </div>
    </div>
  );
};
